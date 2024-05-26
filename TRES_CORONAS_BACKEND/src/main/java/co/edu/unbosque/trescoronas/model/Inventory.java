package co.edu.unbosque.trescoronas.model;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idInventory;
    
    private Date dateInventory;
    private int amountInventory;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_product")
    private Product product;

    // Getters and setters
    public int getIdInventory() {
        return idInventory;
    }

    public void setIdInventory(int idInventory) {
        this.idInventory = idInventory;
    }

    public Date getDateInventory() {
        return dateInventory;
    }

    public void setDateInventory(Date dateInventory) {
        this.dateInventory = dateInventory;
    }

    public int getAmountInventory() {
        return amountInventory;
    }

    public void setAmountInventory(int amountInventory) {
        this.amountInventory = amountInventory;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
