resource "huaweicloud_as_configuration" "my_as_config" {
  scaling_configuration_name = "my_as_config"

  instance_config {
    flavor   = data.huaweicloud_compute_flavors.myflavor.ids[0]
    image    = data.huaweicloud_images_image.myimage.id
    #key_name = var.my_keypair
    disk {
      size        = 40
      volume_type = "SSD"
      disk_type   = "SYS"
    }
    user_data = base64encode("#cloud-config\nruncmd:\n  - echo Hello World > /etc/motd")
  }
}

resource "huaweicloud_as_group" "my_as_group" {
  scaling_group_name       = "my_as_group"
  scaling_configuration_id = huaweicloud_as_configuration.my_as_config.id
  desire_instance_number   = 2
  min_instance_number      = 0
  max_instance_number      = 10
  vpc_id                   = var.vpc_id
  delete_publicip          = true
  delete_instances         = "yes"
  networks {
    id = var.subnet_id
  }
  /* security_groups {
    id = var.secgroup_name
  } */
  security_groups {
    id = data.huaweicloud_networking_secgroup.mysecgroup.id
  }
  tags = {
    owner = "AutoScaling"
  }
}



resource "huaweicloud_ces_alarmrule" "scaling_up_rule" {
  alarm_name = "scaling_up_rule"
  metric {
    namespace   = "SYS.AS"
    metric_name = "cpu_util"
    dimensions {
      name  = "AutoScalingGroup"
      value = huaweicloud_as_group.my_as_group.id
    }
  }
  condition {
    period              = 300
    filter              = "average"
    comparison_operator = ">="
    value               = 80
    unit                = "%"
    count               = 1
  }
  alarm_actions {
    type              = "autoscaling"
    notification_list = []
  }
}
resource "huaweicloud_as_policy" "scaling_up_policy" {
  scaling_policy_name = "scaling_up_policy"
  scaling_policy_type = "ALARM"
  scaling_group_id    = huaweicloud_as_group.my_as_group.id  
  alarm_id            = huaweicloud_ces_alarmrule.scaling_up_rule.id
  cool_down_time      = 300
  scaling_policy_action {
    operation       = "ADD"
    instance_number = 1
  }
}


resource "huaweicloud_ces_alarmrule" "scaling_down_rule" {
  alarm_name = "scaling_down_rule"
  metric {
    namespace   = "SYS.AS"
    metric_name = "cpu_util"
    dimensions {
      name  = "AutoScalingGroup"
      value = huaweicloud_as_group.my_as_group.id
    }
  }
  condition {
    period              = 300
    filter              = "average"
    comparison_operator = "<="
    value               = 20
    unit                = "%"
    count               = 1
  }
  alarm_actions {
    type              = "autoscaling"
    notification_list = []
  }
}
resource "huaweicloud_as_policy" "scaling_down_policy" {
  scaling_policy_name = "scaling_down_policy"
  scaling_policy_type = "ALARM"
  scaling_group_id    = huaweicloud_as_group.my_as_group.id  
  alarm_id            = huaweicloud_ces_alarmrule.scaling_down_rule.id
  cool_down_time      = 300
  scaling_policy_action {
    operation       = "REMOVE"
    instance_number = 1
  }
}


