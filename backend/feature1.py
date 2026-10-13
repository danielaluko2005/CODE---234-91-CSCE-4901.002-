#This is the implementation of the first feature 

#Smart-Home Device Monitoring 

#Parent Class for  devices (general attributes)
<<<<<<< Updated upstream
=======
class SmartHomeDevice:
    def __init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50):
        self.power = power
        self.connected= connected 
        self.software = software
        self.status = status
        self.sound = sound 
        self.volume = volume
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
        if self.connected == true && sourceip != "XXX.XXX.XXX.XXX" && destip != "XXX.XXX.XXX.XXX":
            return true 
        else:
            return false
    def check_status(self)
        if self.status == "stable":
            return true
        else:
            return false
            
    def has_software(self)
        if self.software == true:
            return true 
        else:
            return false
    def sound_on(self)
        if self.sound == true:
            return true 
        else:
            return false
 

    #follow this same format for th rest of the methods
class SmartTherm(SmartHomeDevice):
    def __init__(self, power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        super().__init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        self.temprature = 72
        self.valid_temp = true


    def check_temp(self):
        if temprature <  55 or temprature > 85:
            self.valid_temp = false
            return false 
        else:
            self.valid_temp = true
            return true

    def display_temp(self):
        print("", self.temprature, "F")

class SmartDoor(SmartHomeDevice):
    def __init__(self, power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        super().__init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        self.locked = true
        self.door = true

    def is_locked(self):
        if locked == true:
            return true 
        else:
            return false

    def is_closed(self):
        if door == true:
            return true
        else 
            return false
  
class SmartCamera(SmartHomeDevice):
    def __init__(self, power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        super().__init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        self.capture = false
        self.motion = false
        self.focused = false 
        self.covered = false

    def is_capture(self):
        if capture == true:
            return true 
        else:
            return false

    def is_motion_detected(self):
        if motion == true:
            return true 
        else:
            return false
>>>>>>> Stashed changes

#Child class for each kind of device 

#Classes keep track of all the device data 

#Flag for the state of machine (compromised vs. secure)