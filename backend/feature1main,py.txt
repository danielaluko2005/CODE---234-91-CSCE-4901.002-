##This is going to show the test cases for the code 
import feature1

newdevice=feature1.SmartHomeDevice()
camera1=feature1.SmartCamera()
thermo1=feature1.SmartThermo()
frontdoor=feature1.SmartDoorLock()

"""
general attributes to track for all devices
power
connected
software
status
sound 
volume
sourceip
destip
port 
working 

Device specific attributes to track for each device

Smart Thermo:
temp
valid_temp

Smart Door:
locked 
door

Smart Camera:
capture
motion
focus
cover


"""


#simulation of daily device status checks and updates
  print("Good morning! We will now start device monitoring. This is your daily device status check.")

for i in range(0, 10):
    print("Probing...")
    print("Checking device network environment status...")

    for i in range(0, 10):
        var = random.randrange(0, 10)

        match value:
            case 0:
                #newdevice data 
                newdevice.power = true
                newdevice.connected = true
                newdevice.software =true
                newdevice.status = "stable"
                newdevice.sound = "Beep"
                newdevice.volume = 50
                newdevice.sourceip = "192.168.22.100"
                newdevice.destip = "127.231.94.8"
                newdevice.port = 22
                newdevice.working = true
            
                camera1.power = true
                camera1.connected = true
                camera1.software =true
                camera1.status = "stable"
                camera1.sound = "Beep"
                camera1.volume = 50
                camera1.sourceip = "192.168.22.100"
                camera1.destip = "127.231.94.8"
                camera1.port = 22
                camera1.working = true


#every 3rd iteration, put the status of all the devices and threats
#if i % 3 == 0;

