package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.Favorite;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.repository.FavoriteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class FavoriteService {
  private FavoriteRepository favoriteRepository;

  public void addFavorite(@NonNull Post post, @NonNull User user) {
    Favorite favorite = new Favorite();
    favorite.setUser(user);
    favorite.setPost(post);
    favoriteRepository.save(favorite);
  }

  public void removeFavorite(@NonNull Post post, @NonNull User user) {
    Optional<Favorite> favorite = favoriteRepository.findByUserAndPost(user, post);
    if (favorite != null) {
      this.favoriteRepository.delete(favorite.get());
    }
  }

  public Page<Favorite> getFavoriteList(@NonNull User user, @NonNull Integer pageNum, @NonNull Integer pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "createdTime"));
    Page<Favorite> favoritePage = favoriteRepository.findAllByUser(user, pageable);
    return favoritePage;
  }

  public Boolean isFavorite(@NonNull User user, @NonNull Post post) {
    return favoriteRepository.findByUserAndPost(user, post).isPresent();
  }

}
