#This is the implementation of the first feature 

#Smart-Home Device Monitoring 

#Parent Class for  devices (general attributes)
<<<<<<< Updated upstream
=======
class SmartHomeDevice:
    def __init__(power=false, connected=false, software=false, status="stable", sound="Beep", volume=50, sourceip="XXX.XXX.XXX.XXX", destip="XXX.XXX.XXX.XXX", port=8080, working=false):
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
        if  self.sourceip != "XXX.XXX.XXX.XXX" and self.destip != "XXX.XXX.XXX.XXX" and self.port != 0:
            self.connected == true
            return true 
        else:
            return false

    def check_status(self)
        if self.connected == true and self.software == true and self.working == true and self.power == true:
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

    def check_working(self)
        if self.sound == true and self.power == true and self.volume > 0:
            self.working == true
            return true 
        else:
            self.working == false
            return false

    def stable_state(self)
        #newdevice data
            self.power = true
            self.connected = true
            self.software =true
            self.status = "stable"
            self.sound = "Beep"
            self.volume = 50
            self.sourceip = "192.168.22.100"
            self.destip = "127.231.94.8"
            self.port = 22
            self.working = true
    
    def unstable_state(self, value):
         match value:
            case 1:
            #device is completely down
            self.power = false
            self.connected = false
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 3000
            self.working = false


            case 2:
            #device is working but not connected to the network
            self.power = true
            self.connected = false
            self.software =true
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 80
            self.working = true
            

            case 3:
            #device is not working but it is connected to the network
            self.power = true
            self.connected = true
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "192.168.22.31"
            self.destip = "127.231.93.24"
            self.port = 3000
            self.working = false
            

    
 

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
        if self.valid_temp == true and self.check_working() == true:
            return true
        else:
            return false
    
    def  stable_thermo(self):
            self.power = true
            self.connected = true
            self.software =true
            self.status = "stable"
            self.sound = "Beep"
            self.volume = 50
            self.sourceip = "192.168.22.100"
            self.destip = "127.231.94.8"
            self.port = 22
            self.working = true
            self.temprature = 72
            self.valid_temp = true

    def unstable_thermo(self, value):
        match value:
            case 1:
            #device is completely down
            self.power = false
            self.connected = false
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 3000
            self.working = false
            self.temprature = 0
            self.valid_temp = false


            case 2:
            #device is working but not connected to the network
            self.power = true
            self.connected = false
            self.software =true
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 80
            self.working = false
            self.temprature = 72
            self.valid_temp = false
 

            case 3:
            #device is working but temperature is not valid
            self.power = true
            self.connected = true
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "192.168.22.17"
            self.destip = "127.231.93.10"
            self.port = 3000
            self.working = false
            self.temprature = 99
            self.valid_temp = false


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
    
    def is_working(self):
        super().check_working()
        if self.locked == true and self.door == true and super().check_working() == true:
            return true
        else:
            return false

    #method to set a stable state for the smart door 
    def  stable_door(self):
            self.power = true
            self.connected = true
            self.software =true
            self.status = "stable"
            self.sound = "Beep"
            self.volume = 50
            self.sourceip = "192.168.22.100"
            self.destip = "127.231.94.8"
            self.port = 22
            self.working = true
            self.locked = true
            self.door = true

     #method to set a unstable state for the smart door
     def unstable_door(self, value):
        match value:
            case 1:
            #device is completely down
            self.power = false
            self.connected = false
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 3000
            self.working = false
            self.locked = false
            self.door = false


            case 2:
            #device is working but not connected to the network
            self.power = true
            self.connected = false
            self.software =true
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 88
            self.working = false
            self.locked = true
            self.door = false


            case 3:
            #device is working but door is open and unlocked
            self.power = true
            self.connected = true
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "192.168.22.29"
            self.destip = "127.231.93.4"
            self.port = 3000
            self.working = false
            self.locked = false
            self.door = false

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
        if self.capture == true and self.motion == true and self.focused == true and super().check_working():
            return true
        else:
            return false 
def  stable_cam(self):
            self.power = true
            self.connected = true
            self.software =true
            self.status = "stable"
            self.sound = "Beep"
            self.volume = 50
            self.sourceip = "192.168.22.100"
            self.destip = "127.231.94.8"
            self.port = 22
            self.working = true
            self.capture = true
            self.motion = true
            self.focused = true 
            self.covered = true

     #method to set a unstable state for the smart door
     def unstable_cam(self, value):
        match value:
            case 1:
            #device is completely down
            self.power = false
            self.connected = false
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 3000
            self.working = false
            self.capture = false
            self.motion = false
            self.focused = false 
            self.covered = false

            case 2:
            #device is working but not connected to the network
            self.power = true
            self.connected = false
            self.software =true
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "XXX.XXX.XXX.XXX"
            self.destip = "XXX.XXX.XXX.XXX"
            self.port = 88
            self.working = false
            self.working = true
            self.capture = true
            self.motion = true
            self.focused = true 
            self.covered = true


            case 3:
            #device is working but not capturing anything 
            self.power = true
            self.connected = true
            self.software =false
            self.status = "unstable"
            self.sound = None
            self.volume = 0
            self.sourceip = "192.168.22.17"
            self.destip = "127.231.93.10"
            self.port = 3000
            self.working = false
            self.working = false
            self.capture = false
            self.motion = false
            self.focused = false 
            self.covered = false
    # def capture(self):
    #     if self.is_capturing() == true:
    #         print("Starting live capture...")
    #     else:
    #         print("Camera is not responding to capture request.")

    

#Add smart device for garage door, smart light, and smart fridge 
#Flag for the state of machine (compromised vs. secure)