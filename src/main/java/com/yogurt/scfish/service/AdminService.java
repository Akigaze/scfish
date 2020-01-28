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
public class AdminService {

  private UserRepository userRepository;

  public User addUser(UserDTO userDTO) throws DuplicatedException {
    if (this.userRepository.existsById(userDTO.getId())) {
      throw new DuplicatedException();
    }
    User user = userDTO.convert();
    return this.userRepository.save(user);
  }

  public boolean validate(String id, String password) {
    User user = this.userRepository.findByIdAndPassword(id, password);
    return user != null;
  }
}
