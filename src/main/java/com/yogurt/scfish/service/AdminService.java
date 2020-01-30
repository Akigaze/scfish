package com.yogurt.scfish.service;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.UserParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminService {

  private UserRepository userRepository;

  public User addUser(UserParam userParam) throws DuplicatedException {
    if (this.userRepository.existsById(userParam.getId())) {
      throw new DuplicatedException();
    }
    User user = userParam.convertTo();
    return this.userRepository.save(user);
  }

  public boolean validate(String id, String password) {
    User user = this.userRepository.findByIdAndPassword(id, password);
    return user != null;
  }

  public void authorize(HttpServletRequest request, String id) {
    HttpSession session = request.getSession(true);
    session.setAttribute(SessionAttribute.USER_TOKEN, DigestUtils.md5DigestAsHex(id.getBytes()));
    session.setAttribute(SessionAttribute.USER_ID, id);
  }

}
