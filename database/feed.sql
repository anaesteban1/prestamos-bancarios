USE PrestamosDB;
GO

INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Phone, Role)
VALUES
('Ana', 'Esteban', 'ana@email.com', 'hash1', '999111111', 'CLIENT'),
('Carlos', 'Perez', 'carlos@email.com', 'hash2', '999111112', 'CLIENT'),
('Maria', 'Lopez', 'maria@email.com', 'hash3', '999111113', 'CLIENT'),
('Jose', 'Ramirez', 'jose@email.com', 'hash4', '999111114', 'CLIENT'),
('Lucia', 'Torres', 'lucia@email.com', 'hash5', '999111115', 'CLIENT'),
('Pedro', 'Sanchez', 'pedro@email.com', 'hash6', '999111116', 'CLIENT'),
('Andrea', 'Flores', 'andrea@email.com', 'hash7', '999111117', 'CLIENT'),
('Miguel', 'Castro', 'miguel@email.com', 'hash8', '999111118', 'CLIENT'),
('Sofia', 'Vargas', 'sofia@email.com', 'hash9', '999111119', 'CLIENT'),
('Admin', 'Sistema', 'admin@email.com', 'hash10', '999111120', 'ADMIN');
GO

INSERT INTO Loans (UserId, Amount, InterestRate, TermMonths, MonthlyPayment, Status)
VALUES
(1, 5000, 10, 12, 439.58, 'APPROVED'),
(2, 8000, 11, 18, 484.12, 'APPROVED'),
(3, 3000, 9, 12, 262.35, 'PENDING'),
(4, 12000, 12, 24, 564.88, 'APPROVED'),
(5, 4500, 10.5, 10, 470.25, 'APPROVED'),
(6, 7000, 13, 20, 392.15, 'PENDING'),
(7, 10000, 14, 24, 480.13, 'APPROVED'),
(8, 2500, 8, 8, 322.10, 'APPROVED'),
(9, 6000, 11.5, 15, 431.75, 'PENDING'),
(1, 15000, 15, 36, 519.97, 'APPROVED');
GO

INSERT INTO Payments (LoanId, Amount, PaymentMethod)
VALUES
(1, 439.58, 'TRANSFER'),
(1, 439.58, 'CARD'),
(2, 484.12, 'TRANSFER'),
(4, 564.88, 'CARD'),
(5, 470.25, 'CASH'),
(7, 480.13, 'TRANSFER'),
(8, 322.10, 'CARD'),
(10, 519.97, 'TRANSFER'),
(2, 484.12, 'CARD'),
(4, 564.88, 'TRANSFER');
GO