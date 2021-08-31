package com.sorveteria.SorveteriaAPI.controller;

import com.sorveteria.SorveteriaAPI.model.Sorvete;
import com.sorveteria.SorveteriaAPI.service.SorveteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sorvete")
@CrossOrigin(origins = "http://localhost:4200")
public class SorveteController {

    @Autowired
    SorveteService sorveteService;

    @PostMapping
    public Sorvete createSorvete (@RequestBody Sorvete sorvete){
        return sorveteService.save(sorvete);
    }

    @GetMapping
    public List<Sorvete> findAllSorvete(){
        return sorveteService.findAllSorvete();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sorvete> findSorveteById(@PathVariable Long id){
        return sorveteService.findSorveteById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateSorvete(@RequestBody Sorvete sorvete, @PathVariable Long id){
        return sorveteService.updateSorvete(sorvete, id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteSorvete(@PathVariable Long id){
        return sorveteService.deleteSorvete(id);
    }
}
