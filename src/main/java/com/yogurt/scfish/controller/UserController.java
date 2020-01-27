package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scfish/v1/users")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

  private UserService userService;

  @GetMapping()
  public List<User> getUserList(){
    return this.userService.getAllUsers();
  }

  @PostMapping()
  public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO){
    try {
      User saved = this.userService.addUser(userDTO);
      return ResponseEntity.accepted().body(saved);
    } catch (DuplicatedException e) {
      return ResponseEntity.badRequest().build();
    }
  }
}
