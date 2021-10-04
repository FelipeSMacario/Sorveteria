package com.sorveteria.SorveteriaAPI.service;

import com.sorveteria.SorveteriaAPI.model.Sabores;
import com.sorveteria.SorveteriaAPI.repository.SaboresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SaboresService {
    @Autowired
    public SaboresRepository saboresRepository;

    public Sabores createSabor(Sabores sabores){
        return saboresRepository.save(sabores);
    }

    public List<Sabores> findAllSabores() {
        return saboresRepository.findAll();
    }

    public List<Sabores> findByNome(String nome) {return saboresRepository.findByNomeContaining(nome);}

    public ResponseEntity<Sabores> findById(Long id){
        return saboresRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity updateSabores(@RequestBody Sabores sabores, Long id){
        return saboresRepository.findById(id)
                .map(record -> {
                    record.setNome(sabores.getNome());
                    

                    Sabores sabor = saboresRepository.save(record);
                    return ResponseEntity.ok().body(sabor);
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity deleteSabores(Long id){
        return saboresRepository.findById(id)
                .map(record -> {
                    saboresRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
