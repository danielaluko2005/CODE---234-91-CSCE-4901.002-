#This is the implementation of the first feature 

#Smart-Home Device Monitoring 

#Parent Class for  devices (general attributes)
class SmartHomeDevice:
    def __init__(power=false, connected=false, software=false, status="good", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false):
        self.power = power
        self.connected= connected 
        self.software = software
        self.status = status
        self.sound = sound 
        self.sourceip = sourceip
        self.destip = destip
        self.port = port 
        self.working = working 
    
    def has_power(self)
        if self.power == true:
            return true
        else: 
            return false
    
    def is_connected(self)
        if self.connected == true:
            return true 
        else:
            return false
    #follow this same format for th rest of the methods

#Child class for each kind of device 

#Classes keep track of all the device data 

#Flag for the state of machine (compromised vs. secure)