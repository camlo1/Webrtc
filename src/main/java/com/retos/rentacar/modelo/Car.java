/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.retos.rentacar.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author cjop1
 */
/*
Entidad clase vehículo (tabla Car)
 */
@Entity
@Table(name = "car")
public class Car implements Serializable {
    
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer idCar;
    
        private String name;
    
    
    private String brand;
    
   
    private Integer year;
    
    private String description;
    
    @ManyToOne
    @JoinColumn(name ="idGama")
    @JsonIgnoreProperties("cars")
    private Gama gama;

    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy="car")
    @JsonIgnoreProperties({"car" , "client"})
    
    /*
    Lista de mensajes generados para el vehículo
    */
    private List<Message> messages;
    
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy="car")
    @JsonIgnoreProperties({"car" , "client"})
    
    /*
    Lista de reservas generadas para el vehículo
    */
    private List<Reservation> reservations;

    public Integer getIdCar() {
        return idCar;
    }

    public void setIdCar(Integer idCar) {
        this.idCar = idCar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Gama getGama() {
        return gama;
    }

    public void setGama(Gama gama) {
        this.gama = gama;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    
}
    
