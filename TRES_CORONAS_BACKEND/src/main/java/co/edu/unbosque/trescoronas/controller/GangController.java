package co.edu.unbosque.trescoronas.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.trescoronas.model.Gang;
import co.edu.unbosque.trescoronas.repository.GangRepository;

@CrossOrigin(origins = "http://localhost:4200")	
@RequestMapping("/Tres-Coronas-Bar/Bar/Site/Gang")
@RestController
public class GangController {

	
	@Autowired
	private GangRepository gangRepository;
	
	@GetMapping
	Iterable<Gang>list(){
		return gangRepository.findAll();
	}
	
	  @PostMapping
	    public Gang createGang(@RequestBody Gang gang) {
	        return gangRepository.save(gang);
	    }
	  
	  @GetMapping("/site/{idSite}")
	    public Gang getGangBySiteId(@PathVariable int idSite) {
	        return gangRepository.findGangBySiteId(idSite);
	    }

}
	
	
