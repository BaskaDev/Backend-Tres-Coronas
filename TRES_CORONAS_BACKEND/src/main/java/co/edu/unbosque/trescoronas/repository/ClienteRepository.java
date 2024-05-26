package co.edu.unbosque.trescoronas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import co.edu.unbosque.trescoronas.model.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente,Integer> {
    
    @Query("SELECT c FROM Cliente c JOIN FETCH c.gang")
    Iterable<Cliente> findAllWithGang();
    
    @Query("SELECT c FROM Cliente c WHERE c.gang.idGang = :idGang")
    List<Cliente> findClientsByGangId(int idGang);
   
}
