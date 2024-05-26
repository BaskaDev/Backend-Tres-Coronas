package co.edu.unbosque.trescoronas.controller;

import co.edu.unbosque.trescoronas.model.Bar;
import co.edu.unbosque.trescoronas.model.Employee;
import co.edu.unbosque.trescoronas.repository.EmployeeRepository;
import co.edu.unbosque.trescoronas.service.EmployeeService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")	
@RequestMapping("/Tres-Coronas-Bar/Bar/Site/Employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
	Iterable<Employee> List(){
		return employeeRepository.findAll();
	}
    
    
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.save(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> getById(@PathVariable Integer employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        if (employeeOptional.isPresent()) {
            return ResponseEntity.ok(employeeOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @GetMapping("/by-site/{siteId}")
    public List<Employee> getBySiteId(@PathVariable int siteId) {
        // Suponiendo que Employee tiene una relación @ManyToOne con Site
        return employeeRepository.findBySiteIdSite(siteId);
    }
    
    @DeleteMapping("/{id}")
	  public ResponseEntity<Void> deleteBar(@PathVariable("id") Integer id) {
	      try {
	          // Eliminar el bar
	          employeeRepository.deleteById(id);
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
