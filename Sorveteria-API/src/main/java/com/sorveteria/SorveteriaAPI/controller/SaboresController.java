package com.sorveteria.SorveteriaAPI.controller;

import com.sorveteria.SorveteriaAPI.model.Sabores;
import com.sorveteria.SorveteriaAPI.service.SaboresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/sabores")
@CrossOrigin(origins = "http://localhost:4200")
public class SaboresController {
    @Autowired
    SaboresService saboresService;

    @PostMapping
    public Sabores createSabor(@RequestBody Sabores sabores){
        return saboresService.createSabor(sabores);
    }

    @GetMapping()
    public List<Sabores> findAllSabores(){
        return saboresService.findAllSabores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sabores> findSaboresById(@Valid @PathVariable Long id){
        return saboresService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateSabores(@RequestBody Sabores sabores, @PathVariable Long id) {
        return saboresService.updateSabores(sabores, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSabores(@PathVariable Long id){
        return saboresService.deleteSabores(id);
    }

}
