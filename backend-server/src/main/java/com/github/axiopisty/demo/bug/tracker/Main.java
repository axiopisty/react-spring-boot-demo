package com.github.axiopisty.demo.bug.tracker;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@SpringBootApplication
public class Main implements WebMvcConfigurer {
  
  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }
  
  /**
   * This method is overridden in order to enable serving the frontend
   * application (react/svelte) from the root path.
   */
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry
      .addViewController("/{spring:[\\w-]+}")
      .setViewName("forward:/");
    registry
      .addViewController("/*/{spring:[\\w-]+}")
      .setViewName("forward:/");
  }
  
  /**
   * This method is overridden in order to allow requests from the
   * frontend application (react/svelte) while it is running in development
   * mode.
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
      .addMapping("/api/**")
      .allowedOrigins("http://localhost:5173")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedHeaders("*");
  }
}
