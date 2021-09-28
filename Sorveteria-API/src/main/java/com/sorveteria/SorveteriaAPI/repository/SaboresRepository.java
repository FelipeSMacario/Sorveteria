package com.sorveteria.SorveteriaAPI.repository;

import com.sorveteria.SorveteriaAPI.model.Sabores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaboresRepository extends JpaRepository<Sabores, Long> {
}
