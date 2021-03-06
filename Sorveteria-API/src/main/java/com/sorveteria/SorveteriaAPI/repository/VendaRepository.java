package com.sorveteria.SorveteriaAPI.repository;

import com.sorveteria.SorveteriaAPI.model.Venda;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE sorvete SET quantidade_estoque  = quantidade_estoque - (SELECT qtd_item_venda FROM sorveteria.venda WHERE id = :idVenda)  WHERE id = (SELECT sorvete_id FROM sorveteria.venda WHERE id = :idVenda);", nativeQuery = true)
    void updateEstoque(@Param("idVenda") Long id);

    @Query(value ="SELECT * FROM sorveteria.venda WHERE sorvete_id IN (SELECT id FROM sorvete WHERE nome like %:nome%); ", nativeQuery = true)
    List<Venda> filtrarSorvete(@Param("nome") String nome);

}
