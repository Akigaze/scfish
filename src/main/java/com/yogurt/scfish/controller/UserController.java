package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scfish/v1/user")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

  private UserService userService;

  @GetMapping()
  public List<User> getUserList(){
    return this.userService.getAllUsers();
  }

  @GetMapping("/{userId}")
  public User getUserById(@PathVariable("userId") String userId){
    return this.userService.getUserById(userId);
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

  @PutMapping()
  public ResponseEntity<User> updateUser(@RequestBody UserDTO userDTO){
    try {
      User updated = this.userService.updateUser(userDTO);
      return ResponseEntity.accepted().body(updated);
    } catch (NotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/{userId}")
  public ResponseEntity<User> updateUserStatus(
      @PathVariable("userId") String userId,
      @RequestParam(value = "enabled", required = false) Boolean enabled){
    try {
      User frozen = this.userService.updateUserStatus(userId, enabled);
      return ResponseEntity.accepted().body(frozen);
    } catch (NotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  // 一般不使用delete的接口
  @DeleteMapping("/{userId}")
  public ResponseEntity deleteUser(@PathVariable("userId") String userId){
    try {
      this.userService.deleteUserById(userId);
      return ResponseEntity.noContent().build();
    } catch (NotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }
}

