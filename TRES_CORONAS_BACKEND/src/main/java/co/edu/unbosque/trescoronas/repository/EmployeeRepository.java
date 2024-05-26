package co.edu.unbosque.trescoronas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import co.edu.unbosque.trescoronas.model.Bar;
import co.edu.unbosque.trescoronas.model.Employee;

public interface EmployeeRepository extends CrudRepository<Employee,Integer>{
	 List<Employee> findBySiteIdSite(int siteId);
}
