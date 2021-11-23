const express = require("express");
const router = express.Router();
// const Users = [];
const Users = new Map();

router.get("/userData", (req, res) => {
  console.log("request received");
  res.send({
    msg: "Hello there mate",
  });
});

router.get("/getDevices", (req, res) => {
  res.send({
    Users,
  });
});
router.post("/changeState", (req, res) => {
  const { MAC_ID, deviceName, deviceState } = req.body;
  if (MAC_ID) {
    const user = Users.filter((eachUser) => {
      if (eachUser.MAC_ID === MAC_ID) {
        const device = eachUser.devices.filter((eachDevice) => {
          if (eachDevice.deviceName === deviceName) {
            return true;
          } else {
            return false;
          }
        });
        console.log(device, "Device");
        if (device.length === 0) {
          eachUser.devices.push({
            deviceName,
            deviceState,
          });
          res.send({
            devices: eachUser.devices,
          });
        } else {
          res.send({
            msg: "Device Already Exists",
          });
        }
        return true;
      } else {
        return false;
      }
    });
    if (user.length === 0) {
      const obj = {
        MAC_ID,
        devices: [
          {
            deviceName,
            deviceState,
          },
        ],
      };
      Users.push(obj);
      res.send({
        devices: obj.devices,
      });
    }
  }
});

router.post("/getDevice", (req, res) => {
  const { MAC_ID } = req.body;
  console.log(MAC_ID);
  if (MAC_ID) {
    const user = Users.filter((eachUser) => {
      if (eachUser.MAC_ID === MAC_ID) {
        return true;
      } else {
        return false;
      }
    });
    if (user.length === 0) {
      res.send({
        msg: "user not found",
      });
    } else {
      res.send({
        devices: user[0].devices,
      });
    }
  }
});

router.post("/createUser", (req, res) => {
  console.log(req.body, "Req");
  const { MAC_ID, deviceName, deviceState } = req.body;
  console.log(MAC_ID, deviceName, deviceState);
  if (MAC_ID) {
    const user = Users.get(MAC_ID);
    if (!user) {
      const devices = new Map();
      Users.set(MAC_ID, devices);
      res.send({
        userDetails: Users.get(MAC_ID),
      });
    } else {
      res.send({
        msg: "User already exists",
      });
    }
  }
});

router.post("/addDevice", (req, res) => {
  const { MAC_ID, deviceName, deviceState } = req.body;
  const user = Users.get(MAC_ID);
  if (!user) {
    res.send({
      msg: "User does not exist",
    });
  } else {
    const devices = user;
    const device = devices.get(deviceName);
    if (!device) {
      devices.set(deviceName, deviceState);
      res.send({
        Users,
      });
    } else {
      res.send({
        msg: "device name already exists",
      });
    }
  }
});

module.exports = router;
