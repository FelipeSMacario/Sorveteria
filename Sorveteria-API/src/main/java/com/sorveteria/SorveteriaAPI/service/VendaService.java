package com.sorveteria.SorveteriaAPI.service;

import com.sorveteria.SorveteriaAPI.model.Venda;
import com.sorveteria.SorveteriaAPI.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendaService {
    @Autowired
    VendaRepository vendaRepository;


    public Venda createVenda(Venda venda) {
        return vendaRepository.save(venda);
    }

    public void updateEstoque(Long id){
        vendaRepository.updateEstoque(id);
    }

    public Page<Venda> listALlVenda(Pageable pageable){
        return vendaRepository.findAll(pageable);
    }

    public ResponseEntity<Venda> findVendaById(Long id) {
        return vendaRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity updateVenda(Venda venda, Long id) {
        return vendaRepository.findById(id)
                .map(record -> {
                    record.setSorvete(venda.getSorvete());
                    record.setQtdItemVenda(venda.getQtdItemVenda());
                    record.setQtdValorVenda(venda.getQtdValorVenda());
                    record.setSabores(venda.getSabores());

                    Venda update = vendaRepository.save(record);

                    return ResponseEntity.ok().body(update);
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity deleteVenda (Long id) {
        return vendaRepository.findById(id)
                .map(record -> {
                    vendaRepository.deleteById(id);
                    return ResponseEntity.ok().body(id);
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


}
