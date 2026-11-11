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

#sum accumulators to track the number of unstable cases and unstable cases 
        unstable_cases = 0
        stable_cases =0
        allDown = 0
        workNoConnect = 0
        invalidRead= 0
#will updated to a 24 hours loop with 60 miniutes to simulate daily checks 
for i in range(0, 10):
    print("Probing...")
    print("Checking device network environment status...")

    for i in range(0, 10):
        var1 = random.randrange(1, 10)

        

        #The network will be unstable only 30% of the time and stable 70% (perfect scenario)
        #printing the network status every 3 hours start from six and when system is unstable
        match var1:
            case 1:
                #normal case, no issues over network 
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")

            case 2:
                #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")
            case 3:

                #variable to pick the random unstable case and varied IP
                varNewD= random.randrange(1, 3)
                varCam= random.randrange(1, 3)
                varThermo= random.randrange(1, 3)
                varFrDo= random.randrange(1, 3)
                #unstable cases, randomized cases for network unstability
                newdevice.unstable_state(carNewD)
                camera1.unstable_state(varCam)
                thermo1.unstable_state(varThermo)
                frontdoor.unstable_state(varFrDo)

                #printing the device check states for unstable state 
                print("Device check complete. The state of all devices in the network:")
                print(f"New Smart Home Device: {newdevice.status}")
                print(f"New Smart Camera Device: {camera1.status}")
                print(f"New Smart Thermostat Device: {thermo1.status}")
                print(f"New Smart Front Door Device: {frontdoor1.status}")

                #checking if any device is unstable and printing warning message to user 
                if "unstable" in (newdevice.status,camera1.status, thermo1.status, frontdoor1.status):
                    print("A device in the network has been compromised. System is not secured.")
                    print("Please run system recovery rountine and restart system.")
            case 4:
                #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")
            case 5:
                #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")
            case 6:
                #variable to pick the random unstable case and varied IP
                #variable to pick the random unstable case and varied IP
                varNewD= random.randrange(1, 3)
                varCam= random.randrange(1, 3)
                varThermo= random.randrange(1, 3)
                varFrDo= random.randrange(1, 3)
                #unstable cases, randomized cases for network unstability
                newdevice.unstable_state(varNewD)
                camera1.unstable_state(varCam)
                thermo1.unstable_state(varThermo)
                frontdoor.unstable_state(varFrDo)

                #printing the device check states for unstable state 
                print("Device check complete. The state of all devices in the network:")
                print(f"New Smart Home Device: {newdevice.status}")
                print(f"New Smart Camera Device: {camera1.status}")
                print(f"New Smart Thermostat Device: {thermo1.status}")
                print(f"New Smart Front Door Device: {frontdoor1.status}")

                #checking if any device is unstable and printing warning message to user 
                if "unstable" in (newdevice.status,camera1.status, thermo1.status, frontdoor1.status):
                    print("A device in the network has been compromised. System is not secured.")
                    print("Please run system recovery rountine and restart system.")
            
            case 7:
                #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")
            case 8:
                #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")
            case 9:
                    #variable to pick the random unstable case and varied IP
                varNewD= random.randrange(1, 3)
                varCam= random.randrange(1, 3)
                varThermo= random.randrange(1, 3)
                varFrDo= random.randrange(1, 3)
                #unstable cases, randomized cases for network unstability
                newdevice.unstable_state(varNewD)
                camera1.unstable_state(varCam)
                thermo1.unstable_state(varThermo)
                frontdoor.unstable_state(varFrDo)

                #printing the device check states for unstable state 
                print("Device check complete. The state of all devices in the network:")
                print(f"New Smart Home Device: {newdevice.status}")
                print(f"New Smart Camera Device: {camera1.status}")
                print(f"New Smart Thermostat Device: {thermo1.status}")
                print(f"New Smart Front Door Device: {frontdoor1.status}")

                #checking if any device is unstable and printing warning message to user 
                if "unstable" in (newdevice.status,camera1.status, thermo1.status, frontdoor1.status):
                    print("A device in the network has been compromised. System is not secured.")
                    print("Please run system recovery rountine and restart system.")

            case 10:
            #normal case, no issues over network
                newdevice.stable_state()
                camera1.stable_state()
                thermo1.stable_state()
                frontdoor.stable_state()

                #printing status report every 3 hours start from 6 AM
                if (i >= 6):
                    if (i % 3):
                        print("Device check complete. The state of all devices in the network:")
                        print(f"New Smart Home Device: {newdevice.status}")
                        print(f"New Smart Camera Device: {camera1.status}")
                        print(f"New Smart Thermostat Device: {thermo1.status}")
                        print(f"New Smart Front Door Device: {frontdoor1.status}")
                        print(f"All smart devices are stable. System secured.")

    #final status check after full day of device monitoring

    #if (i == 23 and j == 45):

    if (i == 9 and j == 9):
        print("Daily device status check complete.\n Time," + str(i) + ":" + str(j) + " PM")
        print("This is the daily device status check report for all network devices.")
        print("-----------------DAILY DEVICE STATUS CHECK REPORT-----------------------")
        print("The network system had", unstable_cases, "unstable cases." )
        print("From the unstable cases: \nThe devices were completely down for", allDown, "cases.")
        print("The devices were working but not connected for", workNoConnect, "cases.")
        print("The devices were not working but connected for", invalidRead, "cases.")
        print("The network system had", stable_cases, "stable cases.")
        print("The system remained secure for", (stable_cases/10)*100, "'%'of the time.")
        print("The system remained unsecure for", (unstable_cases/10)*100, "'%' of the time.")
        print("-----------------------------END OF REPORT-----------------------------")

