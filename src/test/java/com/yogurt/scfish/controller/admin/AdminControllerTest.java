package com.yogurt.scfish.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.service.AdminService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
public class AdminControllerTest {
  private ObjectMapper objectMapper = new ObjectMapper();

  @Mock
  private AdminService adminService;

  @InjectMocks
  private AdminController adminController;

  private MockMvc mockMvc;

  @Before
  public void setUp() throws Exception {
    mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
  }

  @Test
  public void should_get_AuthToken_when_execute_login() throws Exception {
    LoginParam loginParam = new LoginParam();
    loginParam.setUsername("test-user");
    loginParam.setPassword("test-password");

    AuthToken authToken = new AuthToken();
    authToken.setAccessToken("test-access-token");
    authToken.setRefreshToken("test-refresh-token");

    when(adminService.authorize(any(LoginParam.class))).thenReturn(authToken);

    MockHttpServletRequestBuilder request = MockMvcRequestBuilders
        .post("/scfish/admin/v1/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(loginParam));

    ResultActions resultActions = mockMvc.perform(request);

    resultActions
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(authToken)));
  }

}