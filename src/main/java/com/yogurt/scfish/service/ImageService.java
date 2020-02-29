package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.param.ImageParam;
import com.yogurt.scfish.entity.Image;
import com.yogurt.scfish.repository.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ImageService {
  private ImageRepository imageRepository;

  public void saveImg(@NonNull Integer postId, @NonNull Integer index,@NonNull byte[] img,@NonNull byte[] thumbnail){
    Image image = new Image();
    image.setThumbnail(thumbnail);
    image.setImg(img);
    image.setPicIndex(index);
    image.setPostId(postId);
    imageRepository.save(image);
  }

  public List<String> getThumbnails(@NonNull Integer postId){
    Pageable pageable = PageRequest.of(0,6,new Sort(Sort.Direction.ASC,"picIndex"));
    Page<Image> imgPage = imageRepository.findAllByPostId(postId,pageable);
    if (imgPage.isEmpty()){
      return null;
    }
    List<String> list = new ArrayList<>();
    imgPage.map(image -> {
      BASE64Encoder encoder = new BASE64Encoder();
      list.add(encoder.encode(image.getThumbnail()));
      return image;
    });
    return list;
  }

  public String getImage(@NonNull ImageParam imageParam){
    BASE64Encoder encoder = new BASE64Encoder();
    Optional<Image> imageOptional = imageRepository.findByPostIdAndPicIndex(imageParam.getPostId(),imageParam.getIndex());
    return encoder.encode(imageOptional.get().getImg());
  }

  public void deleteImgs(@NonNull Integer postId){
    imageRepository.findAllByPostId(postId,null).map(value->{
      imageRepository.delete(value);
      return null;
    });
  }
}
