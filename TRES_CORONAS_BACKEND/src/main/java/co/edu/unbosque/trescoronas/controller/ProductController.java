package co.edu.unbosque.trescoronas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.trescoronas.model.Product;
import co.edu.unbosque.trescoronas.repository.ProductRepository;

@RestController
@CrossOrigin
@RequestMapping("/Tres-Coronas-Bar/Bar/product")
public class ProductController {


    @Autowired
    private ProductRepository productRepository;

    // Método para crear un nuevo producto
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // Método para obtener todos los productos
    @GetMapping
    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Método para obtener un producto por su ID
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable("id") int id) {
        return productRepository.findById(id);
    }

    

    // Método para eliminar un producto
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") int id) {
        productRepository.deleteById(id);
    }
}
