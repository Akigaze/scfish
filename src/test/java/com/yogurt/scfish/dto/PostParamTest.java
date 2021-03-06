package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class PostParamTest {

  @Test
  public void should_convert_to_Post_entity() {
    PostParam postParam = new PostParam(100, "test_user", "First Post", "Today was ...");

    Post post = postParam.convertTo();

    assertThat(post.getId(), is(100));
    assertThat(post.getUserId(), is("test_user"));
    assertThat(post.getTitle(), is("First Post"));
    assertThat(post.getContent(), is("Today was ..."));
  }

  @Test
  public void should_update_properties_of_Post_entity() {
    PostParam postParam = new PostParam(100, "test_user", "First Post", "Today was ...");

    Post post = new Post(100, "demo_user", "Hello World", "What a wonderful ...");

    postParam.update(post);

    assertThat(post.getId(), is(100));
    assertThat(post.getUserId(), is("test_user"));
    assertThat(post.getTitle(), is("First Post"));
    assertThat(post.getContent(), is("Today was ..."));
  }
}
