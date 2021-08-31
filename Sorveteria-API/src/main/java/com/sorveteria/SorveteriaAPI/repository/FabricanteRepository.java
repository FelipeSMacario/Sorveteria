package com.sorveteria.SorveteriaAPI.repository;

import com.sorveteria.SorveteriaAPI.model.Fabricante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FabricanteRepository extends JpaRepository<Fabricante, Long> {
}
