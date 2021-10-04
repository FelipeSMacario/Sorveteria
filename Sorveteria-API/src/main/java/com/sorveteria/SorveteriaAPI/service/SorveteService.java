package com.sorveteria.SorveteriaAPI.service;

import com.sorveteria.SorveteriaAPI.model.Sorvete;
import com.sorveteria.SorveteriaAPI.repository.SorveteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SorveteService {
    @Autowired
    SorveteRepository sorveteRepository;

    public Sorvete save(Sorvete sorvete) {
        return sorveteRepository.save(sorvete);
    }

    public List<Sorvete> findAllSorvete() {
        return sorveteRepository.findAll();
    }


    public List<Sorvete> findByNome(String nome) {
        return sorveteRepository.findByNomeContaining(nome);
    }

    public ResponseEntity<Sorvete> findSorveteById(Long id) {
        return sorveteRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity updateSorvete(Sorvete sorvete, Long id){
        return sorveteRepository.findById(id)
                                .map(record -> {
                                    record.setNome(sorvete.getNome());
                                    record.setSabores(sorvete.getSabores());
                                    record.setQuantidadeEstoque(sorvete.getQuantidadeEstoque());
                                    record.setFabricante(sorvete.getFabricante());
                                    record.setValor(sorvete.getValor());
                                    record.setValorFabrica(sorvete.getValorFabrica());
                                    record.setDtCompra(sorvete.getDtCompra());
                                    record.setDtValidade(sorvete.getDtValidade());
                                    Sorvete update = sorveteRepository.save(record);
                                    return ResponseEntity.ok().body(update);
                                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    public ResponseEntity deleteSorvete(Long id){
        return sorveteRepository.findById(id)
                                .map(record -> {
                                    sorveteRepository.deleteById(id);
                                    return ResponseEntity.ok().body(id);
                                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
