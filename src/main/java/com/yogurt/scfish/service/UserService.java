package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.ForbiddenException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserService {

  private UserRepository userRepository;

  @NonNull
  public User getByUsernameOfNonNull(String username) throws NotFoundException {
    return userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("user name is not existed").setErrorData(username));
  }

  public void mustNotBeDeleted(@NonNull User user) {
    if (user.isDeleted()) {
      throw new ForbiddenException("The user has been forbidden").setErrorData(user.getUsername());
    }
  }

  @NonNull
  public boolean isPasswordMatched(@NonNull User user, @NonNull String password) {
    return user.getPassword().equals(password);
  }
}
