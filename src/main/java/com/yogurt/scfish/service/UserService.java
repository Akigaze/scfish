package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
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

  public User addUser(UserDTO userDTO) throws DuplicatedException {
    User found = userRepository.findByUserId(userDTO.getUserId());
    if (found != null){
      throw new DuplicatedException();
    }
    User user = userDTO.convert();
    return userRepository.save(user);
  }
}
