package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.UserDTO;
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

  public User addUser(UserDTO userDTO) throws DuplicatedException {
    if (this.userRepository.existsById(userDTO.getId())) {
      throw new DuplicatedException();
    }
    User user = userDTO.convert();
    return this.userRepository.save(user);
  }

  public User updateUser(UserDTO userDTO) throws NotFoundException {
    User found = this.userRepository.findById(userDTO.getId()).orElseThrow(NotFoundException::new);
    User user = userDTO.convert(found);
    return this.userRepository.save(user);
  }

  public void deleteUserById(String id) throws NotFoundException {
    User found = this.userRepository.findById(id).orElseThrow(NotFoundException::new);
    this.userRepository.delete(found);
  }

  public User updateUserStatus(String id, Boolean enabled) throws NotFoundException {
    User found = this.userRepository.findById(id).orElseThrow(NotFoundException::new);
    found.setEnabled(enabled == null ? !found.isEnabled() : enabled);
    return this.userRepository.save(found);
  }
}
