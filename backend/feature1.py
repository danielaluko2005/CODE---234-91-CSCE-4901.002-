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
        if self.connected == true and self.sourceip != "XXX.XXX.XXX.XXX" and self.destip != "XXX.XXX.XXX.XXX":
            return true 
        else:
            return false

    def check_status(self)
        if self.connected == true and self.software == true and self.working == true:
            self.status == "stable"
            return self.status
        else:
            self.status == "unstable"
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

    def is_working(self)
        if self.working == true:
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
        if self.temprature <  55 or self.temprature > 85:
            self.valid_temp = false
            return false 
        else:
            self.valid_temp = true
            return true

    def display_temp(self):
        print("", self.temprature, "F")
    
    def is_working(self):
        if self.valid_temp == true
            return true
        else:
            return false

class SmartDoor(SmartHomeDevice):
    def __init__(self, power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        super().__init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        self.locked = true
        self.door = true

    def is_locked(self):
        if self.locked == true:
            return true 
        else:
            return false

    def is_closed(self):
        if self.door == true:
            return true
        else 
            return false
    
    # def lock_door(self):
    #     if self.locked == false:
    #         print("---Security Alert---")
    #         print("The door is open.")
    #     question = input("Would you like to lock the door? (Y/N)")
    #     if question == "Y":
    #         print ("Locking door...")
    #         self.locked = true
    #         print("The door has been locked.")
    #     else:
    #         print("The door remains unlocked. Please lock the door.")

        

class SmartCamera(SmartHomeDevice):
    def __init__(self, power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        super().__init__(power=false, connected=false, software=false, status="stable", sound="Beep", sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false, volume=50)
        self.capture = false
        self.motion = false
        self.focused = false 
        self.covered = false

    def is_capturing(self):
        if self.capture == true and self.covered == false and self.focused == true:
            return true 
        else:
            return false

    def has_motion(self):
        if self.motion == true:
            return true 
        else: 
            return false
    def is_focused(self):
        if self.focused == true:
            return true
        else:
            return false
    def is_covered(self):
        if self.covered == true:
            return true
        else:
            return false

    def is_working(self):
        if self.capture == true and self.motion == true and self.focused == true:
            return true
        else:
            return false 

    # def capture(self):
    #     if self.is_capturing() == true:
    #         print("Starting live capture...")
    #     else:
    #         print("Camera is not responding to capture request.")

    

#Add smart device for garage door, smart light, and smart fridge 
#Flag for the state of machine (compromised vs. secure)