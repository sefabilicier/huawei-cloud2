resource "huaweicloud_rds_instance" "instance" {
  name              = "low_perf_low_cost_rds"
  flavor            = "rds.pg.n1.medium.2" 
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
    size = 200 #  Its value range is from 40 GB to 4000 GB
  }

  backup_strategy {
    start_time = "08:00-09:00"
    keep_days  = 1
  }
}