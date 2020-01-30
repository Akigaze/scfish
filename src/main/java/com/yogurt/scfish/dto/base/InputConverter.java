package com.yogurt.scfish.dto.base;


import com.yogurt.scfish.util.BeanUtil;
import com.yogurt.scfish.util.ReflectionUtil;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;

import java.lang.reflect.ParameterizedType;

public interface InputConverter<E> {

  @SuppressWarnings("unchecked")
  default E convertTo() {
    ParameterizedType entityType = this.getParameterizedType();
    Assert.notNull(entityType, "Can't get actual type because parameterized type is null");

    Class<E> entityClass = (Class<E>) entityType.getActualTypeArguments()[0];
    return BeanUtil.transformFrom(this, entityClass);
  }

  default void update(E entity) {
    BeanUtil.updateProperties(this, entity);
  }

  @Nullable
  default ParameterizedType getParameterizedType() {
    return ReflectionUtil.getParameterizedType(InputConverter.class, this.getClass());
  }
}
