package com.yogurt.scfish.service;

import com.yogurt.scfish.contstant.ForbiddenEnum;
import com.yogurt.scfish.dto.ForbiddenDTO;
import com.yogurt.scfish.dto.param.ForbiddenParam;
import com.yogurt.scfish.entity.Forbidden;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.repository.ForbiddenRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;


@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ForbiddenService {
  private ForbiddenRepository forbiddenRepository;
  private UserService userService;

  public void addForbiddenUser(ForbiddenParam forbiddenParam) {
    User user = userService.getByUsernameOfNonNull(forbiddenParam.getUsername());
    forbiddenRepository.findTopByUserOrderByCreatedTimeDesc(user).ifPresent(oldForbidden->{
      oldForbidden.setWithdraw(true);
      forbiddenRepository.save(oldForbidden);
    });

    Forbidden newForbidden = forbiddenParam.convertTo();
    newForbidden.setUser(user);
    forbiddenRepository.save(newForbidden);
  }

  public void liftForbiddenUser(String username) {
    User user = userService.getByUsernameOfNonNull(username);
    Forbidden forbidden = forbiddenRepository.findTopByUserOrderByCreatedTimeDesc(user).get();
    forbidden.setWithdraw(true);
    forbiddenRepository.save(forbidden);
  }

  public boolean isUserForbidden(String username){
    User user = userService.getByUsernameOfNonNull(username);
    Optional<Forbidden> forbiddenOptional = forbiddenRepository.findTopByUserOrderByCreatedTimeDesc(user);

    return forbiddenOptional.filter(this::isForbidden).isPresent();
  }

  public boolean isForbidden(Forbidden forbidden) {
    long endTime = forbidden.getCreatedTime().plusSeconds(ForbiddenEnum.valueOf(forbidden.getType()).getDuration()).toEpochSecond(ZoneOffset.of("+8"));
    long currentTime = Instant.now().getEpochSecond();
    return !forbidden.isWithdraw()&&endTime>=currentTime;
  }

  public ForbiddenDTO convert(Forbidden forbidden){
    ForbiddenDTO forbiddenDTO = new ForbiddenDTO().convertFrom(forbidden);
    forbiddenDTO.setUsername(forbidden.getUser().getUsername());
    forbiddenDTO.setNickname(forbidden.getUser().getNickname());
    forbiddenDTO.setType(forbidden.getType().toLowerCase().replace("_"," "));
    forbiddenDTO.setRemark(forbidden.getRemark());
    forbiddenDTO.setStartTime(forbidden.getCreatedTime());

    forbiddenDTO.setForbidden(isForbidden(forbidden));

    return forbiddenDTO;
  }

  public Page<ForbiddenDTO> getForbiddenHistory(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "createdTime"));
    Page<Forbidden> forbiddenPage = forbiddenRepository.findAll(pageable);
    return forbiddenPage.map(this::convert);
  }
}
