use monyapp;

CREATE TABLE member (
    memb_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(15),
    account_name VARCHAR(255),
    acc_no VARCHAR(20),
    branch VARCHAR(255),
    ifsc_code VARCHAR(20),
    pancard_front_image VARCHAR(255),
    pancard_back_image VARCHAR(255),
    aadhaar_no VARCHAR(20),
    pincode VARCHAR(10),
    pancard_front_image_path VARCHAR(255),
    pancard_back_image_path VARCHAR(255)
);



-- Seller Table
CREATE TABLE seller (
    seller_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(15),
    account_name VARCHAR(255),
    acc_no VARCHAR(20),
    branch VARCHAR(255),
    ifsc_code VARCHAR(20),
    company_logo VARCHAR(255),
    company_name VARCHAR(255),
    gst_no VARCHAR(20),
    pancard_front_image VARCHAR(255),
    pancard_back_image VARCHAR(255),
    aadhaar_no VARCHAR(20),
    pincode VARCHAR(10)
);
ALTER TABLE seller
ADD COLUMN pancard_front_image_path VARCHAR(255),
ADD COLUMN pancard_back_image_path VARCHAR(255),
ADD COLUMN company_logo_path VARCHAR(255);


CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
    product_name VARCHAR(255) NOT NULL,
    product_images JSON, -- Assuming you want to store images as a JSON array
    video_url VARCHAR(255), -- Assuming you want to store the video URL
    mrp_price DECIMAL(10, 2) NOT NULL,
    offer DECIMAL(5, 2),
    final_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE `order` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    memb_id INT,
    seller_id INT,
    product_id INT,
    product_name VARCHAR(255) NOT NULL,
    order_receipt VARCHAR(255),  -- Assuming order_receipt is a path or identifier for the receipt
    buyer_name VARCHAR(255),     -- Assuming the name of the buyer
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INT NOT NULL DEFAULT 1,  -- Assuming the quantity of the ordered product   
    FOREIGN KEY (memb_id) REFERENCES member(memb_id),
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);
ALTER TABLE product
ADD COLUMN commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00;


ALTER TABLE `order`
ADD COLUMN commission_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00;
