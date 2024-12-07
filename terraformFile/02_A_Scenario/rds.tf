variable "vpc_id" {default = "01a307b0-d8fa-4888-8082-d899abf03d1c"}
variable "subnet_id" {default = "ba20153e-2238-4b8a-9945-dc528d77a41b"}
variable "postgreSQL_password" {default = "SecureP@ssw0rd!"}

resource "huaweicloud_rds_instance" "instance" {
  name              = "low_perf_low_cost_rds"
  flavor            = "rds.pg.n1.medium.2" # 2 vCPU, 4 GB RAM
  vpc_id            = var.vpc_id
  subnet_id         = var.subnet_id
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id

 
  availability_zone  = [data.huaweicloud_availability_zones.myaz.names[0]]

   db {
    type     = "PostgreSQL"
    version  = "16"
    password = var.postgreSQL_password
  }

  volume {
    type = "CLOUDSSD"
    size = 40 #  Its value range is from 40 GB to 4000 GB
  }

  backup_strategy {
    start_time = "08:00-09:00"
    keep_days  = 1
  }
}



