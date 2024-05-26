	package co.edu.unbosque.trescoronas.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import co.edu.unbosque.trescoronas.model.Bar;
import co.edu.unbosque.trescoronas.repository.BarRepository;
import co.edu.unbosque.trescoronas.repository.SiteRepository;

@CrossOrigin	
@RequestMapping("/Tres-Coronas-Bar/Bar")
@RestController
public class BarController {

	@Autowired
	private BarRepository barRepository;

	@GetMapping
	Iterable<Bar> List(){
		return barRepository.findAll();
	}
	
	@PostMapping
    public ResponseEntity<Map<String, Object>> createBar(@RequestBody Bar bar) {
        Map<String, Object> response = new HashMap<>();
        try {
            Bar b = barRepository.save(bar);
            response.put("message", "Bar creado con éxito");
            response.put("id", b.getIdBar());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "Error al crear el bar");
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	
	  @GetMapping("/{id}")
	    public ResponseEntity<Map<String, Object>> getBarById(@PathVariable Integer id) {
	        Map<String, Object> response = new HashMap<>();
	        Optional<Bar> bar = barRepository.findById(id);
	        if (bar.isPresent()) {
	            response.put("bar", bar.get());
	            return new ResponseEntity<>(response, HttpStatus.OK);
	        } else {
	            response.put("message", "Bar no encontrado");
	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	        }
	    }
	  
	  @PutMapping("/{id}")
	    public ResponseEntity<Map<String, Object>> updateBar(@PathVariable Integer id, @RequestBody Bar updatedBar) {
	        Map<String, Object> response = new HashMap<>();
	        try {
	            Optional<Bar> barOptional = barRepository.findById(id);
	            if (barOptional.isPresent()) {
	                Bar bar = barOptional.get();
	                bar.setNameBar(updatedBar.getNameBar());
	                bar.setAddressBar(updatedBar.getAddressBar());
	                bar.setLocallyBar(updatedBar.getLocallyBar());
	                // Añadir otros campos que desees actualizar
	                
	                Bar savedBar = barRepository.save(bar);
	                response.put("message", "Bar actualizado con éxito");
	                response.put("bar", savedBar);
	                return new ResponseEntity<>(response, HttpStatus.OK);
	            } else {
	                response.put("message", "Bar no encontrado");
	                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	            }
	        } catch (Exception e) {
	            response.put("message", "Error al actualizar el bar");
	            response.put("error", e.getMessage());
	            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  	  
	  @DeleteMapping("/{id}")
	  public ResponseEntity<Void> deleteBar(@PathVariable("id") Integer id) {
	      try {
	          // Eliminar el bar
	          barRepository.deleteById(id);
	          // Devolver una respuesta vacía con estado 204 (No Content)
	          return ResponseEntity.noContent().build();
	      } catch (EmptyResultDataAccessException e) {
	          // Si no se encuentra el bar, devolver estado 404 (Not Found)
	          return ResponseEntity.notFound().build();
	      } catch (Exception e) {
	          // En caso de cualquier otro error, devolver estado 500 (Internal Server Error)
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	      }
	  }


	  
}
