package co.edu.unbosque.trescoronas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unbosque.trescoronas.model.Site;

public interface SiteRepository extends CrudRepository<Site,Integer> {
	
	   @Query("SELECT s FROM Site s JOIN FETCH s.bar")
	    Iterable<Site> findAllWithBar();
	   
	   @Query("SELECT s FROM Site s WHERE s.bar.idBar = :idBar")
	    List<Site> findByBarId(int idBar);
	   
	   

}
