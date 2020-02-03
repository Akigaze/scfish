package com.yogurt.scfish.cache;

import org.junit.Before;
import org.junit.Test;

import java.io.Serializable;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class InMemoryCacheStoreTest {
  private InMemoryCacheStore cacheStore;

  @Before
  public void setup() {
    cacheStore = new InMemoryCacheStore();
  }

  @Test
  public void should_get_the_data_put_into_cache_store() {
    cacheStore.put("test-key", "test-value");
    Optional<String> optionalValue = cacheStore.get("test-key");

    assertTrue(optionalValue.isPresent());
    assertThat(optionalValue.get(), is("test-value"));
  }

  @Test
  public void should_get_null_when_the_data_put_into_cache_store_is_expired() throws InterruptedException {
    cacheStore.put("test-key", "test-value", 900, ChronoUnit.MILLIS);

    TimeUnit.SECONDS.sleep(1L);

    Optional<String> optionalValue = cacheStore.get("test-key");

    assertFalse(optionalValue.isPresent());
  }

  @Test
  public void should_get_data_when_the_data_put_into_cache_store_is_not_expired() throws InterruptedException {
    cacheStore.put("test-key", "test-value", 1200, ChronoUnit.MILLIS);

    TimeUnit.SECONDS.sleep(1L);

    Optional<String> optionalValue = cacheStore.get("test-key");

    assertTrue(optionalValue.isPresent());
    assertThat(optionalValue.get(), is("test-value"));
  }

  @Test
  public void should_not_put_when_the_data_already_in_cache_store_by_putIfAbsent() {
    cacheStore.put("test-key", "test-value", 2, ChronoUnit.SECONDS);

    boolean result = cacheStore.putIfAbsent("test-key", "test-another-value", 10, ChronoUnit.MINUTES);

    Optional<String> optionalValue = cacheStore.get("test-key");

    assertFalse(result);
    assertTrue(optionalValue.isPresent());
    assertThat(optionalValue.get(), is("test-value"));
  }

  @Test
  public void should_not_get_the_data_when_it_was_deleted() {
    cacheStore.putAny("test-key", "test-value");

    cacheStore.delete("test-key");

    Optional<String> optionalValue = cacheStore.get("test-key");

    assertFalse(optionalValue.isPresent());
  }

  @Test
  public void should_get_an_object_that_put_into_cache_store() {
    TestObject testObject = new TestObject();
    testObject.setName("Test test");
    testObject.setSize(10);
    cacheStore.putAny("test-key", testObject);

    Optional<TestObject> optionalTestObject = cacheStore.getAny("test-key", TestObject.class);

    assertTrue(optionalTestObject.isPresent());
    TestObject object = optionalTestObject.get();
    assertThat(object.getName(), is(testObject.getName()));
    assertThat(object.getSize(), is(testObject.getSize()));
  }

  @Test
  public void should_put_an_object_with_expired_time_into_cache_store() throws InterruptedException {
    TestObject testObject = new TestObject();
    testObject.setName("Test test");
    testObject.setSize(10);
    cacheStore.putAny("test-key", testObject, 900, ChronoUnit.MILLIS);

    TimeUnit.SECONDS.sleep(1L);

    Optional<TestObject> optionalTestObject = cacheStore.getAny("test-key", TestObject.class);

    assertFalse(optionalTestObject.isPresent());
  }

}


class TestObject implements Serializable {
  private String name;
  private int size;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }
}
