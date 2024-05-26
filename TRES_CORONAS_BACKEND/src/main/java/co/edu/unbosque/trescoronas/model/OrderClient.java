package co.edu.unbosque.trescoronas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_client")
public class OrderClient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOrderClient;
    
    private double amountOrderClient;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_client")
    private Cliente client;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_product")
    private Product product;

    // Getters and setters
    public int getIdOrderClient() {
        return idOrderClient;
    }

    public void setIdOrderClient(int idOrderClient) {
        this.idOrderClient = idOrderClient;
    }

    public double getAmountOrderClient() {
        return amountOrderClient;
    }

    public void setAmountOrderClient(double amountOrderClient) {
        this.amountOrderClient = amountOrderClient;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
