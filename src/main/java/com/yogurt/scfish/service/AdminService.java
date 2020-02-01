package com.yogurt.scfish.service;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminService {

  private UserRepository userRepository;

  public void addUser(@NonNull RegisterParam registerParam) throws DuplicatedException {
    if (this.userRepository.existsById(registerParam.getUsername())) {
      throw new DuplicatedException();
    }
    User user = registerParam.convertTo();
    this.userRepository.save(user);
  }

  @NonNull
  public Optional<User> validate(@NonNull LoginParam loginParam) {
    return this.userRepository.findByUsernameAndPassword(loginParam.getUsername(), loginParam.getPassword());
  }

  @NonNull
  public String authorize(HttpServletRequest request, @NonNull User user) {
    HttpSession session = request.getSession(true);
    String token = DigestUtils.md5DigestAsHex(user.getUsername().getBytes());
    session.setAttribute(SessionAttribute.USER_TOKEN, token);
    session.setAttribute(SessionAttribute.USER, user);
    session.setAttribute(SessionAttribute.USER_ID, user.getUsername());
    return token;
  }

}
