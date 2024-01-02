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
    pancard_no varchar(10),
    aadhaar_no VARCHAR(20),
    pincode VARCHAR(10),    
    parent_id INT, -- Reference to the parent member
    FOREIGN KEY (parent_id) REFERENCES member(memb_id)
);

-- Disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Delete all records from the 'member' table
DELETE FROM member;

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;


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
    company_logo_path VARCHAR(255),
    company_name VARCHAR(255),
    gst_no VARCHAR(20),
    pancard_no varchar(10),
    aadhaar_no VARCHAR(20),
    pincode VARCHAR(10)
);



CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
    product_name VARCHAR(255) NOT NULL,
    product_images JSON, -- Assuming you want to store images as a JSON array
    video_url VARCHAR(255), -- Assuming you want to store the video URL
    total_stocks_added VARCHAR(255),
    no_of_stocks_available VARCHAR(255),
    commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
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
    order_receipt VARCHAR(255),
    buyer_name VARCHAR(255),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INT NOT NULL DEFAULT 1,
    order_commission DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (memb_id) REFERENCES member(memb_id),
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);




CREATE TABLE genealogy_tree (
    relationship_id INT AUTO_INCREMENT PRIMARY KEY,
    ancestor_id INT,
    descendant_id INT,
    FOREIGN KEY (ancestor_id) REFERENCES member(memb_id),
    FOREIGN KEY (descendant_id) REFERENCES member(memb_id)
);

-- Create the earnings table
CREATE TABLE earnings (
    earning_id INT PRIMARY KEY AUTO_INCREMENT,
    memb_id INT,
    date DATE,
    todays_earnings DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_earnings DECIMAL(10, 2) NOT NULL DEFAULT 0,
    FOREIGN KEY (memb_id) REFERENCES member(memb_id)
);

