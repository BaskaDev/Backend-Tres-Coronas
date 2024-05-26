package co.edu.unbosque.trescoronas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "status_client")
public class StatusClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_status_client;  // Debe coincidir con el JSON
    private String type_status_client;
	public int getId_status_client() {
		return id_status_client;
	}
	public void setId_status_client(int id_status_client) {
		this.id_status_client = id_status_client;
	}
	public String getType_status_client() {
		return type_status_client;
	}
	public void setType_status_client(String type_status_client) {
		this.type_status_client = type_status_client;
	}  // Debe coincidir con el JSON

    // Getters y setters
  
}

