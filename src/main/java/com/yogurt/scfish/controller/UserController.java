package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.param.RegisterParam;
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
  public List<User> getUserList() {
    return this.userService.getAllUsers();
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable("id") String id) {
    return this.userService.getUserById(id);
  }

  @PostMapping()
  public ResponseEntity<User> addUser(@RequestBody RegisterParam userParam) {
    try {
      User saved = this.userService.addUser(userParam);
      return ResponseEntity.accepted().body(saved);
    } catch (DuplicatedException e) {
      return ResponseEntity.status(e.getStatus()).build();
    }
  }

  @PutMapping()
  public ResponseEntity<User> updateUser(@RequestBody RegisterParam userParam) {
    try {
      User updated = this.userService.updateUser(userParam);
      return ResponseEntity.accepted().body(updated);
    } catch (NotFoundException e) {
      return ResponseEntity.status(e.getStatus()).build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUserStatus(
      @PathVariable("id") String id,
      @RequestParam(value = "enabled", required = false) Boolean enabled) {
    try {
      User frozen = this.userService.updateUserStatus(id, enabled);
      return ResponseEntity.accepted().body(frozen);
    } catch (NotFoundException e) {
      return ResponseEntity.status(e.getStatus()).build();
    }
  }

  // 一般不使用delete的接口
  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable("id") String id) {
    try {
      this.userService.deleteUserById(id);
      return ResponseEntity.noContent().build();
    } catch (NotFoundException e) {
      return ResponseEntity.status(e.getStatus()).build();
    }
  }
}

