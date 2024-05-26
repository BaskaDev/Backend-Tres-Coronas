package co.edu.unbosque.trescoronas.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import co.edu.unbosque.trescoronas.model.Cliente;
import co.edu.unbosque.trescoronas.model.Gang;
import co.edu.unbosque.trescoronas.model.Site;
import co.edu.unbosque.trescoronas.repository.ClienteRepository;

@CrossOrigin(origins = "http://localhost:4200")	
@RequestMapping("/Tres-Coronas-Bar/Bar/Site/Gang/Client")
@RestController
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@GetMapping
	Iterable<Cliente> List(){
		return clienteRepository.findAll();
	}
	
	

	
	@PostMapping
    public ResponseEntity<Map<String, Object>> createCliente(@RequestBody Cliente cliente) {
        Map<String, Object> response = new HashMap<>();

            Cliente c = clienteRepository.save(cliente);
            response.put("message", "Cliente creado con éxito");
       
            return new ResponseEntity<>(response, HttpStatus.CREATED);


    }
	
	  @GetMapping("/{id}")
	    public ResponseEntity<Map<String, Object>> getClienteById(@PathVariable Integer id) {
	        Map<String, Object> response = new HashMap<>();
	        Optional<Cliente> c = clienteRepository.findById(id);
	        if (c.isPresent()) {
	            response.put("Cliente", c.get());
	            return new ResponseEntity<>(response, HttpStatus.OK);
	        } else {
	            response.put("message", "Cliente no encontrado");
	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	        }
	    }
	  
	    @PutMapping("/{clientId}")
	    public ResponseEntity<Cliente> updateClient(@PathVariable Integer clientId, @RequestBody Cliente clientDetails) {
	        Optional<Cliente> clientOptional = clienteRepository.findById(clientId);
	        if (clientOptional.isPresent()) {
	            Cliente client = clientOptional.get();
	            client.setName_client(clientDetails.getName_client());
	            client.setUser_client(clientDetails.getUser_client());
	            client.setPass_client(clientDetails.getPass_client());
	            client.setGang(clientDetails.getGang());
	            client.setStatusClient(clientDetails.getStatusClient());
	            return new ResponseEntity<>(clienteRepository.save(client), HttpStatus.OK);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    
	    @DeleteMapping("/{clientId}")
	    public ResponseEntity<HttpStatus> deleteClient(@PathVariable Integer clientId) {
	        try {
	            clienteRepository.deleteById(clientId);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    @GetMapping("/ByGang/{id}")
	    public ResponseEntity<List<Cliente>> getSitesByBarId(@PathVariable int id) {
	        try {
	            List<Cliente> sites = clienteRepository.findClientsByGangId(id);
	            return new ResponseEntity<>(sites, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	
		  @GetMapping("/gang")
			Iterable<Cliente> ListGang(){
				return clienteRepository.findAllWithGang();
			}
	
	
}
