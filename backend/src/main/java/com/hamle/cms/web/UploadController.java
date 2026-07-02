package com.hamle.cms.web;

import com.hamle.cms.config.AppProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

/** Görsel yükleme — JWT korumalı (/api/admin/uploads). Dosya URL'si döner. */
@RestController
@RequestMapping("/api/admin/uploads")
public class UploadController {

    private final AppProperties props;

    public UploadController(AppProperties props) {
        this.props = props;
    }

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Boş dosya"));
        }
        Path dir = Paths.get(props.getUploads().getDir()).toAbsolutePath();
        Files.createDirectories(dir);

        String original = StringUtils.cleanPath(
                file.getOriginalFilename() == null ? "file" : file.getOriginalFilename());
        String ext = original.contains(".") ? original.substring(original.lastIndexOf('.')).toLowerCase() : "";
        String name = UUID.randomUUID().toString().replace("-", "") + ext;

        file.transferTo(dir.resolve(name));

        String base = props.getUploads().getPublicBaseUrl().replaceAll("/+$", "");
        return ResponseEntity.ok(Map.of("url", base + "/" + name, "filename", name));
    }
}
