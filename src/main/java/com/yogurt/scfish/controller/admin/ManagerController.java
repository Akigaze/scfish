package com.yogurt.scfish.controller.admin;

import com.yogurt.scfish.dto.ForbiddenDTO;
import com.yogurt.scfish.dto.param.ForbiddenParam;
import com.yogurt.scfish.service.ForbiddenService;
import com.yogurt.scfish.service.ManagerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scfish/manager")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ManagerController {
  private ManagerService managerService;
  private ForbiddenService forbiddenService;

  @GetMapping("/isManager")
  public Boolean isManager(){
    return managerService.isManager();
  }

  @PostMapping("/addForbidden")
  public void addForbidden(@RequestBody ForbiddenParam forbiddenParam){
    this.forbiddenService.addForbiddenUser(forbiddenParam);
  }

  @PostMapping("/liftForbidden")
  public void liftForbidden(@RequestBody String username){
    System.out.println("++++++++++"+username);
    this.forbiddenService.liftForbiddenUser(username);
  }

  @GetMapping("/getForbiddenHistory")
  public Page<ForbiddenDTO> getForbiddenHistory(@RequestParam int pageNum,@RequestParam int pageSize){
    return forbiddenService.getForbiddenHistory(pageNum,pageSize);
  }

}
