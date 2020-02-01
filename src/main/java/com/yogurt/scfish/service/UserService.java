package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserService {

  private UserRepository userRepository;

  public List<User> getAllUsers() {
    return this.userRepository.findAll();
  }

  public User getUserById(String id) {
    return this.userRepository.findById(id).orElse(null);
  }

  public User addUser(RegisterParam userParam) throws DuplicatedException {
    if (this.userRepository.existsById(userParam.getUsername())) {
      throw new DuplicatedException();
    }
    User user = userParam.convertTo();
    return this.userRepository.save(user);
  }

  public User updateUser(RegisterParam userParam) throws NotFoundException {
    User found = this.userRepository.findById(userParam.getUsername()).orElseThrow(NotFoundException::new);
    userParam.update(found);
    return this.userRepository.save(found);
  }

  public void deleteUserById(String id) throws NotFoundException {
    User found = this.userRepository.findById(id).orElseThrow(NotFoundException::new);
    this.userRepository.delete(found);
  }

  public User updateUserStatus(String id, Boolean enabled) throws NotFoundException {
    User found = this.userRepository.findById(id).orElseThrow(NotFoundException::new);
    found.setDeleted(enabled == null ? !found.isDeleted() : enabled);
    return this.userRepository.save(found);
  }
}
