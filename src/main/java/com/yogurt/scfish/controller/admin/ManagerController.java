package com.yogurt.scfish.controller.admin;

import com.yogurt.scfish.service.ManagerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scfish/manager")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ManagerController {
  private ManagerService managerService;

  @GetMapping("/isManager")
  public Boolean isManager(){
    return managerService.isManager();
  }

}
