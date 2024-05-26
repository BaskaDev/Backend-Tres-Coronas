package co.edu.unbosque.trescoronas.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import co.edu.unbosque.trescoronas.model.Gang;


public interface GangRepository extends CrudRepository<Gang,Integer> {
    @Query("SELECT g FROM Gang g WHERE g.site.id = :idSite")
    Gang findGangBySiteId(@Param("idSite") int idSite);
}
